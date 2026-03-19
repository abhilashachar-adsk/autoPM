import React from 'react';

// Storage Page Tooltips
export const storagePageTooltips = {
  createStorageAdminOnly:
    'Only project admins can create new storage for the project'
};

// Create Domain Form Tooltips
const createDomainFormTooltips = {
  storageName: {
    title: 'Storage naming guidelines',
    getDescription: (characterLimit: number) => (
      <div>
        To ensure storage names are clear and descriptive, please follow these
        guidelines:
        <br />
        <ul>
          <li>
            Must be at least 3 and not exceed
            {characterLimit} characters
          </li>
          <li>
            Use only lowercase alphanumeric characters, starting with a letter
            and separated by underscores (snake case).
          </li>
          <li>Use full English words without abbreviations.</li>
          <li>
            Provide enough context for the name to be understood without prior
            knowledge.
          </li>
        </ul>
      </div>
    )
  },
  storageDescription: {
    title: 'Storage description guidelines',
    description: (
      <div>
        Please follow these guidelines for storage descriptions:
        <br />
        <ul>
          <li>Maximum 200 characters</li>
          <li>No HTML tags or markup allowed</li>
          <li>
            No special characters that get escaped in JSON:
            <ul>
              <li>Quotes (&quot;)</li>
              <li>Backslashes (\)</li>
            </ul>
          </li>
          <li>Use plain text only</li>
        </ul>
      </div>
    )
  },
  dataClassification: {
    title: 'Data classifications',
    description: (
      <div>
        <b>General, non-sensitive:</b>
        <br />
        Public information that requires no special protection.
        <br />
        <br />
        <b>Sensitive data:</b>
        <br />
        Confidential information needing protection due to privacy, security, or
        competitive risks.
        <br />
        <br />
        <b>Restricted data:</b>
        <br />
        Highly sensitive data including PII, security, medical, or legal
        information.
      </div>
    )
  }
};

export default createDomainFormTooltips;
