import {useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions';
import {createAutocomplete} from '@algolia/autocomplete-core'
import { Link } from 'react-router-dom';
import s from './Searchbar.styles.module.css'

// Autocomplete -->Ref: midudev 'Crea tu propio autocomplete con tailwind, nextjs y algolia'
// link : https://www.youtube.com/watch?v=YybooIn2-JM&t=283s



const AutocompleteItem = ({id, shoeName, thumbnail, price,i}) => {
	return <li className={s.li} style={{zIndex:30}}>
		<Link to={`/shoe/${id}`}><div style={{display:'flex', width:'286px',zIndex:300}}>
			<img alt='alt' src={thumbnail} height='50px'/> <div>
				<h5 className={s.h5}>{shoeName}</h5>
				<h6>US${price.retailPrice}</h6></div>
			</div>
			</Link></li>
}
export default function Searchbar(props) {
	let [input, setInput] = useState('');
	let dispatch = useDispatch();
	const shoes = useSelector((state) => state.shoes)
	let filterBrands = useSelector((state) => state.filterBrands)
	let [searchFilter, setSearchFilter] = useState(filterBrands)

	useEffect( () => {
		setSearchFilter(filterBrands)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filterBrands)])


	const [autocompleteState, setAutocompleteState] = useState({
		collections:[],
		isOpen:false,
	})

	const autocomplete = useMemo( () => createAutocomplete({
		placeholder: 'search Items',
		onStateChange: ({state}) => setAutocompleteState(state),
		getSources: () => [{
			sourceId: 'shoes',
			getItems: ({query}) => {
				if (!!query) {
					//console.log(searchFilter)
					// return fetch(`http://localhost:3001/shoes?shoeName=${query}`)
					let busqueda = shoes.filter(elem => elem.shoeName.toLowerCase().includes(query.toLowerCase()))
					// .then(res => res.json())
					//// if (searchFilter.length > 0){
					//// 	console.log(searchFilter)
					//// 	busqueda = busqueda.filter(elem => elem.brand.name == searchFilter)
					//// 
					return busqueda
					}
				}
			}
		
		],
		...props
	}), [props])

	const formRef = useRef(null)
	const inputRef = useRef(null)
	const panelRef = useRef(null)

	const formProps = autocomplete.getFormProps({
		inputElement: inputRef.current,
		onSubmit: (event) => onSubmitHandler(event)
	})

	const inputProps = autocomplete.getInputProps({
		inputElement: inputRef.current
	})
	
	function onChangeHandler(e) {
		setInput(e.target.value);
	}

	const onSubmit = useCallback(() => {
		dispatch(search(inputRef))
	},)

	function onSubmitHandler(e) {
		e.preventDefault()
		//console.log(e)
		dispatch(search(e.target[0].value));
	}

	return (
		<div className="buscar">
			<form style={{display:'flex',width:'150%',padding:5}} {...formProps} >
			{/* <form style={{display:'flex', width: '150%'}} onSubmit={onSubmitHandler}> */}
				
				<input style={{borderTopLeftRadius:15, borderBottomLeftRadius:15, width:'100%',padding:5}} {...inputProps}  />
				{/* <input style={{borderTopLeftRadius:15, borderBottomLeftRadius:15, width:'100%', padding:5}} type='text' value={input} onChange={onChangeHandler} /> */}
				<button style={{borderTopRightRadius:15, borderBottomRightRadius:15}} type='submit'>Search</button>
				</form>
				{
					autocompleteState.isOpen && 
					<div style={{position:'absolute'}}ref={panelRef} {...autocomplete.getPanelProps()}>
						{autocompleteState.collections.map((collection, index) => {
							//console.log(collection,'collection')
							const {items} = collection
							return (
								<section key={`section=${index}`}>
									{items.length > 0 && (
										<ul {...autocomplete.getListProps()} style={{listStyle:'none'}}>
											{
												items.slice(0,5).map((item )=> <AutocompleteItem key={item.id} {...item}/>)
											}
										</ul>
									)}
								</section>
							)
						})}
						</div>
				}
			
		</div>
	);
}