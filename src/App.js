import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import './App.css';

const stateMatch={
  "Andaman and Nicobar Islands":{ "lat":11.66702557 ,"lon":92.73598262},
  "Andhra Pradesh":{  "lat":14.7504291,"lon": 78.57002559},
  "Arunachal Pradesh":{  "lat":27.10039878,"lon":93.61660071},
  "Assam":{ "lat": 26.7499809  ,"lon":94.21666744},
  "Bihar":{  "lat":25.78541445,"lon":87.4799727},
  "Chandigarh":{  "lat": 30.71999697 ,"lon":76.78000565},
  "Chhattisgarh":{   "lat":22.09042035 ,"lon":82.15998734},
  "Dadra and Nagar Haveli and Daman and Diu":{  "lat":20.26657819 ,"lon":73.0166178},
  "Delhi":{  "lat":28.6699929  ,"lon":77.23000403},
  "Goa":{ "lat":15.491997 ,"lon":73.81800065},
  "Gujarat":{ "lat":22.2587 ,"lon":71.1924},
  "Haryana":{  "lat": 28.45000633 ,"lon":77.01999101},
  "Himachal Pradesh":{  "lat": 31.10002545 ,"lon":77.16659704},
  "Jammu And Kashmir":{ "lat": 34.29995933 ,"lon":74.46665849},
  "Jharkhand":{  "lat":23.80039349 ,"lon":86.41998572},
  "Karnataka":{   "lat":12.57038129 ,"lon":76.91999711},
  "Kerala":{  "lat": 8.900372741 ,"lon":76.56999263},
  "Ladakh":{ "lat":34.209515 ,"lon":77.615112},
  "Lakshadweep":{  "lat":10.56257331 ,"lon":72.63686717},
  "Madhya Pradesh":{   "lat":21.30039105 ,"lon":76.13001949},
  "Maharashtra":{  "lat": 19.25023195 ,"lon":73.16017493},
  "Manipur":{ "lat":24.79997072 ,"lon":93.95001705},
  "Meghalaya":{  "lat":25.57049217,"lon":91.8800142},
  "Mizoram":{ "lat":23.71039899 ,"lon":92.72001461},
  "Nagaland":{   "lat":25.6669979  ,"lon":94.11657019},
  "Odisha":{  "lat": 19.82042971,"lon": 85.90001746},
  "Puducherry":{  "lat": 11.93499371,"lon": 79.83000037},
  "Punjab":{ "lat": 31.51997398 ,"lon":75.98000281},
  "Rajasthan":{  "lat":26.44999921 ,"lon":74.63998124},
  "Sikkim":{ "lat": 27.3333303 ,"lon":88.6166475},
  "Tamil Nadu":{ "lat":12.92038576 ,"lon":79.15004187},
  "Telengana":{ "lat":18.1124 ,"lon":79.0193},
  "Tripura":{ "lat":23.83540428 ,"lon":91.27999914},
  "Uttarakhand":{  "lat":30.0668 ,"lon":78.05000565},
  "Uttar Pradesh":{  "lat":27.59998069 ,"lon":30.0668},
  "West Bengal":{  "lat":22.58039044 ,"lon":88.32994665}
}

function App() {
  // const [showPopup,setShowPopup] = useState([{}]);
  const [viewport, setViewport] = useState({
      width: '100vw',
      height: '100vh',
      latitude: 20.5937,
      longitude: 78.9629,
      zoom: 3
    })
  const [stateMarkers, setStateMarkers] = useState([{}]);
  useEffect(() => {
    (async ()=> {
      await fetch(process.env.REACT_APP_COVID_API).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
).then(res => {
    // console.log(res.status, res.data.data.regional)
    
    const x = res.data.data.regional;
    let z=new Array();
    x.map(y=>{z.push({...y, "id":Math.random().toString(), "showpp":false})});
    z[30].showpp=true;
    setStateMarkers(z);
}));
    })();
  },[])
  function popupOn(state){
    state.showpp = true;
    const g = viewport.zoom + 0.000001;
    const h = viewport;
    let j;
    j={...h,"zoom":g}
    // console.log(j)
    setViewport({...j})
  }
  function closepp(state){
    state.showpp = false;
    const b = stateMarkers;
    let result=new Array();
    b.map(
      s=>{
        result.push({...s, "showpp":false})
      });
    setStateMarkers(result);
  }
  
  
  return (
    <div className="App">

      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/doofenshmirtz/cki4tj3l67yo819p98bktmbxf"
        onViewportChange={(viewport) => setViewport({...viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_APITOKEN}
      >

        {stateMarkers.map(state => {
          // console.log(state.id);
          return(
            <div onClick={()=>{popupOn(state)}} key={state.id}>
        <Marker 
           key={state.id}
           latitude={typeof(stateMatch[state.loc]) == 'undefined'?2:stateMatch[state.loc].lat}
           longitude={typeof(stateMatch[state.loc]) == 'undefined'?2:stateMatch[state.loc].lon}
           offsetLeft={-20}
           offsetTop={-10}>
          <div><svg viewBox="0 0 24 24" width="24" height="24" stroke="yellow" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" ><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
        </Marker>

        {state.showpp && <Popup
          latitude={typeof(stateMatch[state.loc]) == 'undefined'?2:stateMatch[state.loc].lat}
          longitude={typeof(stateMatch[state.loc]) == 'undefined'?2:stateMatch[state.loc].lon}
          closeButton={true}
          closeOnClick={true}
          onClose={()=>{closepp(state)}}
          anchor="top" >
          <div><h3>{state.loc}</h3><p>Total Cases: {state.totalConfirmed}</p></div>
        </Popup>}

        </div>
                )//close return

        // console.log(state.loc);
        // console.log(stateMatch[state.loc])
      })}
      </ReactMapGL>

    </div>
  );
}

export default App;
