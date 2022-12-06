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
        <div>
            <h2>Features</h2>
            <div className="features">
                <Checkbox
                    label="Tourist Attractions"
                    id="toursim"
                    value={() => setValue("tourism")}
                    onChange={() => changeValue("tourism")}
                />
                <Checkbox
                    label="Parks"
                    value={() => setValue("parks")}
                    id="parks"
                    onChange={() => changeValue("parks")}
                />
                <Checkbox
                    label="Restaurants"
                    value={() => setValue("restaurants")}
                    id="restaurants"
                    onChange={() => changeValue("restaurants")}
                />
                <Checkbox
                    label="Museums"
                    value={() => setValue("museums")}
                    id="museuems"
                    onChange={() => changeValue("museums")}
                />
                <Checkbox
                    label="Entertainment"
                    value={() => setValue("entertainment")}
                    id="entertainment"
                    onChange={() => changeValue("entertainment")}
                />
                <Checkbox
                    label="Housing"
                    value={() => setValue("housing")}
                    id="housing"
                    onChange={() => changeValue("housing")}
                />
            </div>
        </div>
    )
}

const Checkbox = ({label, onChange}) => {
    return (
        <label className="feature-label">
            <input className="feature-checkbox" type ="checkbox" defaultChecked={true} onChange={onChange} />
            {label}
        </label>
    )
}

export default SideBar