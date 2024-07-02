import './searchbar.css';

function SearchBar (props=none) {
    
    return (
        <div className='searchbar'>
            <input className='searchinput' id='searchid' type="text" placeholder= {props.placeholder} />
            <i className="pi pi-search" id='searchicon' style={{ fontSize: '1.8rem' }}></i>
        </div>
     )
}

export default SearchBar;