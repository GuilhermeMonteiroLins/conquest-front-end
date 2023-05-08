import ImageSlider from "./ImageSlider";
export default function Home(props) {

    const containerStyles = {
        width: props.width + 'px',
        height: props.heigth + 'px',
        margin: "0 auto",
    }

    return (
        <div style={containerStyles}>
            <ImageSlider slides={props.slides} />
        </div>
    );
};