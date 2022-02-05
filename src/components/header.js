import React from 'react';

import { NavLink } from 'react-router-dom';

import {showModal} from '../components/functions';

import companyLogo from '../img/logo.svg';
import searchIcon from '../img/search.png';
import cartIcon from '../img/cart.svg';
import signIn from '../img/sign-in.png';

const Header = ({HOST, cart, App}) => {

	if(cart.length > 0) {
		document.querySelector('.button-cart').classList.add('pseudo');
	}

	const keyEvents = (evt) => {
		const cartModal = document.querySelector('#modal-cart');
		if(evt.key === 'Escape' && cartModal.classList.contains('show')) {
			cartModal.classList.remove('show');
		}

		if(evt.key === 'Enter') {
			document.querySelector('#button-addon2').click();
		}
	}

	const searchByCategory = (link) => {
		const linkValue = link.textContent;
		const category = link.dataset.field;
		return App.setState({
			value: linkValue,
			category: category,
		}, () => App.getData(App.state.value, App.state.category));
	}

	const searchByName = () => {
		const input = document.querySelector('.search-block > input');
		return App.setState({
      itemName: input.value,
    });
	}

  window.addEventListener('keydown', (evt) => keyEvents(evt));

  return(	
  <header className="container header px-4 px-md-0">
		<div className="row justify-content-between align-items-center">
			<div className="col-lg-2 col-6">
				<a href={`${HOST}`} className="logo-link">
					<img width="128" src={companyLogo} alt="logo: Willberries" className="logo-image"/>
				</a>
			</div>
			<div className="col-lg-6 d-none d-lg-block">
				<nav>
					<ul className="navigation d-flex justify-content-around">
						<li className="navigation-item">
							<NavLink to='/goods' className="navigation-link" data-field="gender" onClick={(e) => searchByCategory(e.target)}>Womens</NavLink>
						</li>
						<li className="navigation-item">
							<NavLink to='/goods' className="navigation-link" data-field="gender" onClick={(e) => searchByCategory(e.target)}>Mens</NavLink>
						</li>
						<li className="navigation-item">
							<NavLink to='/goods' className="navigation-link" data-field="category" onClick={(e) => searchByCategory(e.target)}>Clothing</NavLink>
						</li>
						<li className="navigation-item">
							<NavLink to='/goods' className="navigation-link" data-field="category" onClick={(e) => searchByCategory(e.target)}>Accessories</NavLink>
						</li>
						<li className="navigation-item">
							<NavLink to='/goods' className="navigation-link" data-field="category" onClick={(e) => searchByCategory(e.target)}>Shoes</NavLink>
						</li>
						<li className="navigation-item">
							<NavLink to='/goods' className="navigation-link" onClick={(e) => searchByCategory(e.target)}>All</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<div className="col-lg-2 d-none d-lg-block">
				<div className="form-control search-block">
					<input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username"
						aria-describedby="button-addon2"/>
					<NavLink to="/goods" className="button btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchByName}>
						<img src={searchIcon} alt="search"/>
					</NavLink>
				</div>
			</div>
			<div className="col-lg-2 col-6 d-flex justify-content-end" style={{alignItems: 'center', gap: '20px'}}>
				<a href="/register">
					<img src={signIn} width="20" height="20" alt="icon: sign-in" style={{display: 'flex'}}/>
				</a>
				<button className="button button-cart" data-count={cart.length} onClick={showModal}>
					<img className="button-icon" src={cartIcon} alt="icon: cart"/>
					<span className="button-text">Cart</span>
					<span className="button-text cart-count"></span>
				</button>
			</div>
		</div>
	</header>
  );
}

export default Header;