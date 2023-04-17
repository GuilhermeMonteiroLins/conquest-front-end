import Carrossel from "../../components/Carrossel/Carrossel"
export default function ProdDetail() {
    const slides = [
        { url: "http://localhost:3000/images/image-1.jpg", title: "Fields" },
        { url: "http://localhost:3000/images/image-2.jpg", title: "Bridge" },
        { url: "http://localhost:3000/images/image-3.jpg", title: "Mushrooms" },
        { url: "http://localhost:3000/images/image-4.jpg", title: "Lake" },
        { url: "http://localhost:3000/images/image-5.jpg", title: "Boat" },
    ];

    return (


        <div>
            <h1>Teste</h1>
            <Carrossel
                width={300}
                heigth={280}
                slides={slides}
            />
        </div>

    );
};