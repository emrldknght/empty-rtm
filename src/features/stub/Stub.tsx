// todo - check usage

// utils/Stub.tsx
import type React from 'react';
import StubComponent from '@/features/stub/StubComponent';
// now a React component

// Function that returns a React element
export const Stub = (label: string): React.ReactNode => {
	return <StubComponent label={label} />;
};
