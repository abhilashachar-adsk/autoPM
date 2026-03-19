/**
 * Domain validation utilities for Create Domain form
 */

/**
 * Validate domain name
 * Rules:
 * - Required
 * - Length: 3 to characterLimit (14 in DEV/STG, 18 in PRD)
 * - Must start with lowercase letter
 * - Only lowercase alphanumeric and underscores
 * - Cannot start with dev_, stg_, or prd_
 */
export const validateDomainName = (
  name: string,
  characterLimit: number
): string | undefined => {
  if (!name || name.length === 0) {
    return 'Name is required';
  }

  if (name.length < 3 || name.length > characterLimit) {
    return `Storage name should be between 3 and ${characterLimit} characters inclusive`;
  }

  if (!/^[a-z][a-z0-9_]*$/.test(name)) {
    return 'Invalid name. Use only lowercase alphanumeric characters and underscores.';
  }

  if (/^(dev_|stg_|prd_)/.test(name)) {
    return 'Storage name cannot start with "dev_", "stg_", or "prd_"';
  }

  return undefined;
};

/**
 * Validate domain description
 * Rules:
 * - Required
 * - Max 200 characters
 * - No HTML tags
 * - No backslashes
 * - No special characters that get escaped in JSON (quotes, backslash)
 */
export const validateDomainDescription = (
  description: string
): string | undefined => {
  if (!description || description.length === 0) {
    return 'Description is required';
  }

  if (description.length > 200) {
    return 'Description cannot exceed 200 characters';
  }

  if (/<.*?>/.test(description)) {
    return 'Description cannot contain HTML tags or markup';
  }

  if (/\\/.test(description)) {
    return 'Description cannot contain backslashes';
  }

  const jsonString = JSON.stringify(description);
  if (/\\/.test(jsonString) && jsonString !== `"${description}"`) {
    return 'Description contains special characters that are not allowed (quotes, backslash). Please use plain text only.';
  }

  return undefined;
};
