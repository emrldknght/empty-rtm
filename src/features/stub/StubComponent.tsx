// StubComponent.tsx
import type React from 'react';

type Props = {
	label: string;
};

const StubComponent: React.FC<Props> = ({ label }) => {
	return (
		<div
			className="stub-component"
			style={{ fontStyle: 'italic', color: '#666', padding: '10px' }}
		>
			🚧 Stub: {label}
		</div>
	);
};

export default StubComponent;
