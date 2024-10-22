import React from "react";
import { Card } from "../styles";
import { Text, H5 } from "@adminjs/design-system";
import { Chart } from "react-google-charts";

const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

const TaskType = () => {
    return(
        <Card as="a" href="#" rel="noopener">
            <Text textAlign="center">
                <H5>Título</H5>
                <Text>
                <Chart chartType="PieChart" data={data} width={"100%"} height={"100%"} />
                </Text>
            </Text>
        </Card>
    )
}

export default TaskType;