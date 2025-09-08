import { Card, CardContent, CardHeader } from "@mui/material";
import { Photos } from "./Photo";
import { Click_Example } from "./Click_Example";
import { Counter } from "./Counter";

export const Dashboard = () => (
    <Card>
        <CardHeader title="Título del dashbaord" />  
        <CardContent>
            <Photos />
            <Click_Example />
            <Counter />
        </CardContent>
    </Card>
);