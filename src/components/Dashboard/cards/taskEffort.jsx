import React, { useState, useEffect } from "react";
import { ApiClient, useTranslation } from "adminjs";
import _ from "lodash";
import { Card } from "../styles";
import { Text, H5 } from "@adminjs/design-system";
import { Chart } from "react-google-charts";

// export const data = [
//     [
//       {
//         type: "date",
//         id: "Date",
//       },
//       {
//         type: "number",
//         id: "Won/Loss",
//       },
//     ],
//     [new Date(2024, 3, 13), 13],
//     [new Date(2024, 3, 14), 1],
//     [new Date(2024, 3, 15), 56],
//     [new Date(2024, 3, 16), 2],
//     [new Date(2024, 3, 17), 12],
//     // // Many rows omitted for brevity.
//     // [new Date(2013, 9, 4), 38177],
//     // [new Date(2013, 9, 5), 38705],
//     // [new Date(2013, 9, 12), 38210],
//     // [new Date(2013, 9, 13), 38029],
//     // [new Date(2013, 9, 19), 38823],
//     // [new Date(2013, 9, 23), 38345],
//     // [new Date(2013, 9, 24), 38436],
//     // [new Date(2013, 9, 30), 38447],
// ];

const api = new ApiClient();

const makeChartData = (records) => {
    if(records.length == 0) return;

    const values = _.groupBy(records, (record) => {
        const dateParsed = new Date(record.params.due_date.toString());

        return new Date(
            dateParsed.getFullYear(),
            dateParsed.getMonth(),
            dateParsed.getDate()
        );
    });

    const data = _.map(values, (value, key) => {
        const sum = _.sumBy(value, (v) => v.params.effort || 0);
        return [new Date(key), sum]
    });

    // console.log(data);
    // console.log(values);

    const result = [
        [
            {
                type: "date",
                id: "Data",
              },
              {
                type: "number",
                id: "Esforço",
              },
        ],
        ...data
    ];

    return result;
};

const TaskEffort = () => {
    const { translateMessage } = useTranslation();

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

            setChartData(makeChartData(response.data.records));
            setIsEmpty(apiResponse.data.records == 0);
            setLoading(false);
        })();
    }, []);

    if(loading) {
        return <></>;
    }

    return(
        <Card as="a" href="/admin/resources/tasks" rel="noopener">
            <Text textAlign="center">
                <H5>{translateMessage("taskEffortCardTitle")}</H5>
                {
                    isEmpty ? (
                        <Text>Sem Tarefas</Text>
                    ) : (
                        <Chart
                            chartType="Calendar"
                            width="100%"
                            height="100%"
                            data={chartData}
                        />
                    )
                }
            </Text>
        </Card>
    )
}

export default TaskEffort;