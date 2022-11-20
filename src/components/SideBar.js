import "../App.css";
import { useEffect, useState } from 'react';

const SideBar = () => {
    const [tourCheck, setTourCheck] = useState(false);
    const [parkCheck, setParkCheck] = useState(false);
    const [resCheck, setResCheck] = useState(false);
    const [musCheck, setMusCheck] = useState(false);
    const [houseCheck, setHouseCheck] = useState(false);
    const [enterCheck, setEnterCheck] = useState(false);

    const touristChecked = () => {
        setTourCheck(!tourCheck);
    }
    
    const parksChecked = () => {
       setParkCheck(!parkCheck);
    }

    const restaurantsChecked = () => {
       setResCheck(!resCheck);
    }

    const museumsChecked = () => {
       setMusCheck(!musCheck);
    }

    const housingChecked = () => {
       setHouseCheck(!houseCheck);
    }

    const entertainmentChecked = () => {
       setEnterCheck(!enterCheck);
    }
    
    return (
        <div className="LeftSideBar">
            Markers
        <br></br>
        <Checkbox
            label="Tourist Attractions"
            value={tourCheck}
           onChange={setTourCheck}
        />
        <br></br>
        <Checkbox
            label="Parks"
            value={parkCheck}
           onChange={setParkCheck}
        />
        <br></br>
        <Checkbox
            label="Restaurants"
            value={resCheck}
           onChange={setResCheck}
        />
        <br></br>
        <Checkbox
            label="Museums"
            value={musCheck}
           onChange={setMusCheck}
        />
        <br></br>
        <Checkbox
            label="Housing"
            value={houseCheck}
           onChange={setHouseCheck}
        />
        <br></br>
        <Checkbox
            label="Entertainment"
            value={enterCheck}
           onChange={setEnterCheck}
        />
        </div>
    )
}

const Checkbox = ({label, value, onChange}) => {
    return (
        <label>
            <input type ="checkbox" defaultChecked={false} onChange={onChange} />
            {label}
        </label>
    )
}

export default SideBar