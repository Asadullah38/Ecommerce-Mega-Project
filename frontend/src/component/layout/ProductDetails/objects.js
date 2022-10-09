export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export const options = {
    edit: false,
    color: "lightgrey",
    activeColor: "orange",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
}