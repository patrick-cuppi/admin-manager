import React, { useState, useEffect } from "react";
import _ from "lodash";
import { ApiClient } from "adminjs";
import { Card } from "../styles";
import { Text, H5 } from "@adminjs/design-system";
import { Chart } from "react-google-charts";

// const data = [
//     ["Task", "Hours per Day"],
//     ["Work", 11],
//     ["Eat", 2],
//     ["Commute", 2],
//     ["Watch TV", 2],
//     ["Sleep", 7],
// ];

const api = new ApiClient();

const makeChartData = (records) => {
    const status = {
        backlog: 'Backlog',
        doing: 'Em execução',
        done: 'Pronto',
        approved: 'Aprovado',
        rejected: 'Rejeitado'
    };

    const values = _.groupBy(records, (record) => record.params.status);
    // console.log('Values: ', values);

    const data = _.map(status, (value, key) => [
        value,
        values[key]?.length || 0
    ]) 

    return [
        ["Tipo de tarefa", "Quantidade"],
        ...data
    ]
};

const TaskType = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        (async () => {
            const apiResponse = await api.recordAction(
                {
                    resourceId: 'tasks',
                    actionName: 'list'
                }
            ); 
            // console.log('API Response: ', apiResponse);

            setChartData(makeChartData(apiResponse.data.records));
            setIsEmpty(apiResponse.data.records == 0);
            setLoading(false);
        })();
    }, []);

    if(loading) {
        return <></>;
    }

    return(
        <Card as="a" href="#" rel="noopener">
            <Text textAlign="center">
                <H5>Título</H5>
                {
                    isEmpty ? (
                        <Text>Sem Tarefas</Text>
                    ) : (
                        <Chart chartType="PieChart" data={chartData} width={"100%"} height={"100%"} />
                    )
                }
            </Text>
        </Card>
    )
}

export default TaskType;