import ImageSlider from "./ImageSlider";
export default function Home(props) {

    const containerStyles = {
        width: props.width + 'px',
        height: props.height + 'px',
        marginTop: '20px',
    }

    return (
        <div style={containerStyles}>
            <ImageSlider slides={props.slides} />
        </div>
    );
};