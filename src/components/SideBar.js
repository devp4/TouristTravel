import "../App.css";

const SideBar = ({ viewMarkers, setviewMarkers }) => {
    const setValue = (feature) => {
        // Check checkmark if viewing otherwise blank
        if (viewMarkers.includes(feature)) {
            return true
        }

        return false
    }

    const changeValue = (feature) => {
        if (viewMarkers.includes(feature)) {
            setviewMarkers((current) => current.filter((item) => item !== feature))
        }
        else {
            setviewMarkers([...viewMarkers, feature])
        }
    }

    return (
        <div className="LeftSideBar">Features
            <br></br>
            <Checkbox
                label="Tourist Attractions"
                id="toursim"
                value={() => setValue("tourism")}
                onChange={() => changeValue("tourism")}
            />
            <br></br>
            <Checkbox
                label="Parks"
                value={() => setValue("parks")}
                id="parks"
                onChange={() => changeValue("parks")}
            />
            <br></br>
            <Checkbox
                label="Restaurants"
                value={() => setValue("restaurants")}
                id="restaurants"
                onChange={() => changeValue("restaurants")}
            />
            <br></br>
            <Checkbox
                label="Museums"
                value={() => setValue("museums")}
                id="museuems"
                onChange={() => changeValue("museums")}
            />
            <br></br>
            <Checkbox
                label="Entertainment"
                value={() => setValue("entertainment")}
                id="entertainment"
                onChange={() => changeValue("entertainment")}
            />
            <br></br>
            <Checkbox
                label="Housing"
                value={() => setValue("housing")}
                id="housing"
                onChange={() => changeValue("housing")}
            />
        </div>
    )
}

const Checkbox = ({label, onChange}) => {
    return (
        <label>
            <input type ="checkbox" defaultChecked={true} onChange={onChange} />
            {label}
        </label>
    )
}

export default SideBar