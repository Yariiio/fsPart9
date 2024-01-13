const errorStyle = {
    margin: '10px',
    color: 'red',
    fontSize: '20px',
};

export const Error = ({ message }: { message: string }) => {
    if (!message) return null;
    return <div style={errorStyle}>{message}</div>;
};
