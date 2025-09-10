import { useRedirect } from 'react-admin';

const functionData = [
    { title: 'Ver reportes médicos', to: '/reportes_medicos' },
    { title: 'Ver reportes urbanos', to: '/reportes_urbanos' },
    { title: 'Ver notas médicas', to: '/notas_medicas' },
    { title: 'Ver notas urbanas', to: '/notas_urbanas' },
];

const Function_Box = ({ title, to }: { title: string, to: string }) => {
    const redirect = useRedirect();

    return (
        <div
        onClick={() => redirect(to)}
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '10px',
            padding: '20px',
            minHeight: '120px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
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
};

export const Functions = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
        }}>
            {functionData.map((fn, idx) => (
                <Function_Box key={idx} title={fn.title} to={fn.to} />
            ))}
        </div>
    );
}