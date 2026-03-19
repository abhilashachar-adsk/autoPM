import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Tooltip,
  Checkbox
} from '@weave-mui/material';
import {
  selectVariants,
  textFieldVariants,
  tooltipSize,
  tooltipPlacement
} from '@weave-mui/enums';
import { InfoM, CompleteM } from '@weave-mui/icons-weave';
import { FormHelperText, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import useCreateDomain from '../../hooks/useCreateDomain';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import GenericErrorOverlay from '../layout/GenericErrorOverlay';
import LoadingOverlay from '../layout/LoadingOverlay';
import type { CreateDomainWorkflowInput } from '../../types/domain';
import { getAllDomainNames } from '../../service/infra/infraService';
import { fetchCharLimit } from '../../utils/envVariables';
import {
  validateDomainName,
  validateDomainDescription
} from '../../utils/domainValidation';
import {
  HIVE,
  DATA_CLASS_OPTIONS_MAP,
  DOMAIN_WORKSPACE_OPTIONS_MAP
} from '../../utils/constants';
import createDomainFormTooltips from '../../utils/formTooltips';

interface CreateDomainModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  teamName: string;
  tenantKey: string;
}

interface FormValues {
  domainName: string;
  domainDescription: string;
  workspace: string;
  dataClassification: string;
  enableTWL: boolean;
}

const FORM_ICON_COLOR = '#6B7280';

const CreateDomainModal: React.FC<CreateDomainModalProps> = ({
  open,
  onClose,
  projectId,
  teamName,
  tenantKey
}) => {
  const { data: currentUser } = useGetCurrentUser();
  const {
    mutate: createDomain,
    isPending,
    isSuccess,
    isError,
    reset: resetMutation
  } = useCreateDomain();

  const [domainList, setDomainList] = useState<string[]>([]);
  const [isLoadingDomainList, setIsLoadingDomainList] = useState<boolean>(true);
  const [dataClassificationTouched, setDataClassificationTouched] =
    useState<boolean>(false);

  const characterLimit = fetchCharLimit();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    watch,
    reset,
    setValue
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      domainName: '',
      domainDescription: '',
      workspace: HIVE,
      dataClassification: '',
      enableTWL: false
    }
  });

  const domainName = watch('domainName');
  const dataClassification = watch('dataClassification');
  const enableTWL = watch('enableTWL');

  // Fetch domain names for duplicate checking
  useEffect(() => {
    if (open) {
      setIsLoadingDomainList(true);
      const fetchDomainNames = async () => {
        try {
          const names = await getAllDomainNames();
          setDomainList(names);
          setIsLoadingDomainList(false);
        } catch (error) {
          setIsLoadingDomainList(false);
        }
      };
      fetchDomainNames();
    }
  }, [open]);

  // Check for duplicate domain name (async validation)
  useEffect(() => {
    if (domainName && domainList.length > 0 && !isLoadingDomainList) {
      if (domainList.includes(domainName)) {
        setError('domainName', {
          type: 'manual',
          message: 'This storage name already exists.'
        });
      } else if (
        errors.domainName?.message === 'This storage name already exists.'
      ) {
        // Clear duplicate error if it exists
        clearErrors('domainName');
      }
    }
  }, [
    domainName,
    domainList,
    isLoadingDomainList,
    setError,
    clearErrors,
    errors.domainName
  ]);

  // Reset TWL checkbox when classification changes away from "Need to Know"
  useEffect(() => {
    if (dataClassification !== 'Confidential - Need to Know' && enableTWL) {
      setValue('enableTWL', false);
    }
  }, [dataClassification, enableTWL, setValue]);

  // Helper function to determine final data classification
  const getFinalDataClassification = () => {
    if (dataClassification === 'Confidential - Need to Know' && enableTWL) {
      return 'Confidential - Need to Know TWL';
    }
    return dataClassification;
  };

  const onSubmit = (data: FormValues) => {
    if (!currentUser || !projectId || !teamName || !tenantKey) {
      return;
    }

    const finalClassification = getFinalDataClassification();
    const createDomainRequest: CreateDomainWorkflowInput = {
      domainName: data.domainName,
      domainDescription: data.domainDescription,
      workspaceType: data.workspace,
      domainDataClassification: finalClassification,
      teamId: projectId,
      teamName,
      tenantKey,
      createdBy: currentUser.username
    };

    createDomain(createDomainRequest);
  };

  const handleClose = () => {
    if (isPending) {
      return; // Don't allow closing while submitting
    }

    // Reset form
    reset();
    setDomainList([]);
    setDataClassificationTouched(false);

    // Reset mutation state
    resetMutation();

    onClose();
  };

  // Handle success state
  if (isSuccess) {
    return (
      <Modal
        header="Create New Storage"
        open={open}
        onClose={handleClose}
        data-testid="create-domain-success-modal"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
            py: 4
          }}
          data-testid="create-domain-success-message"
        >
          <CompleteM htmlColor="green" />
          <Box>
            Storage creation request was submitted successfully. You can track
            request status in the &apos;ADP requests&apos; directory.
          </Box>
        </Box>
      </Modal>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <Modal
        header="Create New Storage"
        open={open}
        onClose={handleClose}
        data-testid="create-domain-error-modal"
      >
        <Box data-testid="create-domain-error-content">
          <GenericErrorOverlay errorMessage="There was an error submitting your request. Please try again." />
        </Box>
      </Modal>
    );
  }

  // Handle loading state
  if (isPending || isLoadingDomainList) {
    return (
      <Modal
        header="Create New Storage"
        open={open}
        onClose={handleClose}
        data-testid="create-domain-loading-modal"
      >
        <Box data-testid="create-domain-loading-content">
          {isPending
            ? "Please wait while we're submitting your storage creation request..."
            : 'Loading...'}
          <LoadingOverlay />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      header="Create New Storage"
      open={open}
      onClose={handleClose}
      data-testid="create-domain-modal"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        data-testid="create-domain-form"
      >
        {/* Domain Name Field */}
        <FormControl fullWidth>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <FormLabel required>Storage name</FormLabel>
            <Tooltip
              title={createDomainFormTooltips.storageName.title}
              description={createDomainFormTooltips.storageName.getDescription(
                characterLimit
              )}
              placement={tooltipPlacement.RIGHT_END}
              arrow
              size={tooltipSize.MEDIUM}
            >
              <InfoM htmlColor={FORM_ICON_COLOR} sx={{ height: '18px' }} />
            </Tooltip>
          </Box>
          <Controller
            name="domainName"
            control={control}
            rules={{
              validate: (value) => validateDomainName(value, characterLimit)
            }}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                variant={textFieldVariants.OUTLINED}
                placeholder='e.g. "upchain_models" or "data_asset_tree"'
                error={!!errors.domainName}
                helperText={errors.domainName?.message}
                data-testid="domain-name-input"
              />
            )}
          />
        </FormControl>

        {/* Domain Description Field */}
        <FormControl fullWidth>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <FormLabel required>Storage description</FormLabel>
            <Tooltip
              title={createDomainFormTooltips.storageDescription.title}
              description={
                createDomainFormTooltips.storageDescription.description
              }
              placement={tooltipPlacement.RIGHT_END}
              arrow
              size={tooltipSize.MEDIUM}
            >
              <InfoM htmlColor={FORM_ICON_COLOR} sx={{ height: '18px' }} />
            </Tooltip>
          </Box>
          <Controller
            name="domainDescription"
            control={control}
            rules={{
              validate: validateDomainDescription
            }}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                variant={textFieldVariants.OUTLINED}
                placeholder="Description of storage"
                error={!!errors.domainDescription}
                helperText={errors.domainDescription?.message}
                data-testid="domain-description-input"
              />
            )}
          />
        </FormControl>

        {/* Workspace Type Field (Read-only, Data Lake only) */}
        <FormControl fullWidth>
          <FormLabel required>Workspace type</FormLabel>
          <Controller
            name="workspace"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                variant={selectVariants.BOX}
                disabled
                displayEmpty
                checkmark
                data-testid="workspace-type-select"
              >
                <MenuItem value={HIVE}>
                  {DOMAIN_WORKSPACE_OPTIONS_MAP.HIVE}
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Data Classification Field */}
        <FormControl fullWidth>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <FormLabel required>Data classification</FormLabel>
            <Tooltip
              title={createDomainFormTooltips.dataClassification.title}
              description={
                createDomainFormTooltips.dataClassification.description
              }
              placement={tooltipPlacement.RIGHT_START}
              arrow
              size={tooltipSize.MEDIUM}
            >
              <InfoM htmlColor={FORM_ICON_COLOR} sx={{ height: '18px' }} />
            </Tooltip>
          </Box>
          <Controller
            name="dataClassification"
            control={control}
            rules={{
              validate: (value) =>
                dataClassificationTouched && !value
                  ? 'Classification is required'
                  : undefined
            }}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                variant={selectVariants.BOX}
                onClick={() => setDataClassificationTouched(true)}
                displayEmpty
                checkmark
                renderValue={
                  field.value !== ''
                    ? undefined
                    : () => 'Select data classification'
                }
                error={!!errors.dataClassification}
                data-testid="data-classification-select"
              >
                {Object.entries(DATA_CLASS_OPTIONS_MAP).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={!!errors.dataClassification}>
            {errors.dataClassification?.message}
          </FormHelperText>
        </FormControl>

        {/* TWL Checkbox - Only shown for Confidential - Need to Know */}
        {dataClassification === 'Confidential - Need to Know' && (
          <FormControl fullWidth>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Controller
                name="enableTWL"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        data-testid="twl-checkbox"
                      />
                    }
                    label="Financial data subject to Trading Window List"
                  />
                )}
              />
            </Box>
          </FormControl>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2
          }}
          data-testid="create-domain-modal-actions"
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            data-testid="create-domain-cancel-button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || Object.keys(errors).length > 0}
            data-testid="create-domain-submit-button"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateDomainModal;
