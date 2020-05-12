import axios from 'axios';
import { useState } from 'react';
import { Alert, List, ListItem, ListIcon, Flex } from '@chakra-ui/core';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <Alert status="error">
          <List>
            {err.response.data.errors.map((error) => (
              <Flex alignItems="center">
                <ListIcon icon="warning" color="red.300" />
                <ListItem key={error.message}>{error.message}</ListItem>
              </Flex>
            ))}
          </List>
        </Alert>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
