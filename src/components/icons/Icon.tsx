import React from 'react';


interface IconProps extends React.HTMLProps<HTMLDivElement> {
    src: string;
}

const Icon: React.FC<IconProps> = ({ src, ...props }) => {
    const SvgIcon = React.lazy(() => import(`${src}`));

    return (
        <div {...props}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <SvgIcon />
            </React.Suspense>
        </div>
    );
};

export default Icon;
