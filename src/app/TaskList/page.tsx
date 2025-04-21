import Task from "../components/Task";

export default function Home() {
    const ListOfTasks = ["buy some trash", "drink water", "big jug hot cheese"];

    return (
        <>
            <ul>
                {ListOfTasks.map((task, index) => (
                    <li key={index}>
                        <Task title={task} />
                    </li>
                ))}
            </ul>
        </>
    );
}
