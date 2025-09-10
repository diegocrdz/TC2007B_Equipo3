
const functionData = [
    { title: 'Ver reportes médicos'},
    { title: 'Ver reportes médicos'},
    { title: 'Ver notas médicas'},
    { title: 'Ver notas urbanas'},
];

const Function_Box = ({ title }: { title: string }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '10px',
        padding: '20px',
        minHeight: '120px',
    }}>
        <p style={{
            margin: 0,
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: 'text.primary',
        }}>
            {title}
        </p>
    </div>
);

export const Functions = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
        }}>
            {functionData.map((fn, idx) => (
                <Function_Box key={idx} title={fn.title} />
            ))}
        </div>
    );
}