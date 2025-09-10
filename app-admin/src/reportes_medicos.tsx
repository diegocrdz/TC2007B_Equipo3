import {
    List,
    DataTable,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    Create,
    Show,
    SimpleShowLayout,
    TextField,
    useNotify,
    useRefresh,
    useRedirect,
    useCanAccess,
    TabbedForm,
    SelectInput,
    TabbedShowLayout,
} from "react-admin";

export const RMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

const MOTIVO_CHOICES = [
  { id: "enfermedad", name: "Enfermedad" },
  { id: "traumatismo", name: "Traumatismo" },
  { id: "ginecoobstetrico", name: "Ginecoobstétrico" },
];

export const RMList = () => {
    // check access
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // If the user has delete access, show filters
        <List filters={canAccess ? RMFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="nombre_paciente" label="Nombre paciente" />
                <DataTable.Col source="nombre_testigo" label="Nombre testigo" />
                <DataTable.Col source="nombre_paramedico" label="Nombre paramédico" />
                <DataTable.Col source="nombre_medico" label="Nombre médico" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const RMEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/posts');
        refresh();
    };

    return (
        <Edit mutationOptions={{onSuccess}} >
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="folio" label="Folio" />
                <TextInput source="fecha" label="Fecha" />
                <TextInput source="nombre_paciente" label="Nombre paciente" />
                <TextInput source="nombre_testigo" label="Nombre testigo" />
                <TextInput source="nombre_paramedico" label="Nombre paramédico" />
                <TextInput source="nombre_medico" label="Nombre médico" />
            </SimpleForm>
        </Edit>
    );
};

export const RMCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="tipo" label="Tipo" />
            <TextInput source="fecha" label="Fecha" />
            <TextInput source="nombre_paciente" label="Nombre paciente" />
            <TextInput source="nombre_testigo" label="Nombre testigo" />
            <TextInput source="nombre_paramedico" label="Nombre paramédico" />
            <TextInput source="nombre_medico" label="Nombre médico" />
        </SimpleForm>
    </Create>
);

export const RMCreate2 = () => ( // Protitipo con los campos del reporte de papel
    <Create>
        <TabbedForm>
            <TabbedForm.Tab label="Datos del Servicio">
                <TextInput source="folio" label="Folio" />
                <TextInput source="fecha" label="Fecha" />
                <TextInput source="horaLlam" label="Hora Llamada" />
                <TextInput source="horaSal" label="Hora Salida" />
                <TextInput source="horaLlegada" label="Hora Llegada" />
                <TextInput source="horaTras" label="Hora Traslado" />
                <TextInput source="horaHos" label="Hora Hospital" />
                <TextInput source="salodaHos" label="Salida Hospital" />
                <TextInput source="horaBase" label="Hora Base" />
                <SelectInput
                    source="motivo"
                    label="Motivo de la atención"
                    choices={MOTIVO_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Control">
                <TextInput source="control.numAmbulancia" label="Número de ambulancia" />
                <TextInput source="control.operador" label="Operador" />
                <TextInput source="control.tum" label="T.U.M." />
                <TextInput source="control.socorrista" label="Socorrista" />
                <TextInput source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);

export const RMShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Datos del Servicio">
                <TextField source="folio" label="Folio" />
                <TextField source="fecha" label="Fecha" />
                <TextField source="horaLlam" label="Hora Llamada" />
                <TextField source="horaSal" label="Hora Salida" />
                <TextField source="horaLlegada" label="Hora Llegada" />
                <TextField source="horaTras" label="Hora Traslado" />
                <TextField source="horaHos" label="Hora Hospital" />
                <TextField source="salodaHos" label="Salida Hospital" />
                <TextField source="horaBase" label="Hora Base" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Control">
                <TextField source="control.numAmbulancia" label="Número de ambulancia" />
                <TextField source="control.operador" label="Operador" />
                <TextField source="control.tum" label="T.U.M." />
                <TextField source="control.socorrista" label="Socorrista" />
                <TextField source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedShowLayout.Tab>        </TabbedShowLayout>
    </Show>
);