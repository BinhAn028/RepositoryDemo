export default async function Component1() {
    const data: any = await fetchData1(); // Giả sử mất 10s
    return <div className="my-4">Component 1: {data}</div>;
}

const fetchData1 = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data 1");
        }, 1000);
    });
}