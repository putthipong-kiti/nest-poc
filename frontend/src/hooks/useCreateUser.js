import { useState } from 'react';
import { prismaApiClient } from '../core/interceptor';

export const useCreateUser = () => {

  const [prismaStatus, setPrismaStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const createPrismaUser = async (userData) => {
    try {
      setPrismaStatus({ loading: true, error: null, success: false });
      await prismaApiClient.post('/users', userData);
      setPrismaStatus({ loading: false, error: null, success: true });
    } catch (error) {
      setPrismaStatus({
        loading: false,
        error: error.code === 'ECONNREFUSED'
          ? 'Prisma server is not available'
          : 'Failed to create user in Prisma',
        success: false
      });
    }
  };

  return {
    prismaStatus,
    createPrismaUser,
  };
};