import { Component, Fragment } from 'preact';

import { ListCategory } from '../components/listCategory';

export default class Home extends Component {
	state = {
		filter: ''
	};

	handleChangeFilter = e => {
		const text = e.target.value;
		this.setState({ filter: text });
	};

	filteredCategories(filter) {
		const { results } = this.props;
		const regex = new RegExp(`${filter}`, 'i');

		return Object.keys(results).reduce((acc, key) => {
			return (
				{
					...acc,
					[key]: {
						icon: results[key].icon,
						data: results[key].data.filter(e => (filter.length ? regex.test(e.name) : true))
					}
				}
			);
		}, {});
	}

	render(props, { filter }) {
		const stores = this.filteredCategories(filter)

		return (
			<Fragment>
				<div class="relative p-5 lg:max-w-5xl xl:max-w-6xl lg:m-auto pb-10">
					<input
						class="bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
						type="text"
						placeholder="Cerca Attività"
						onInput={this.handleChangeFilter}
					/>
				</div>
				<div class="relative mb-10 font-sans text-md text-gray-800">
					{
						Object.keys(stores) && Object.keys(stores)
							.filter(key => stores[key].data.length)
							.map(key => (
								<ListCategory
									name={key}
									category={stores[key]}
									filter={filter}
								/>
							))
					}
				</div>
				<div class="text-center w-full">
					<p class="mb-5">
						Developed with ❤️ by
						<a class="text-orange-500" href={process.env.PREACT_APP_DEV_LINK}>{process.env.PREACT_APP_DEV_NAME}</a>
					</p>
					<p class="mb-5">
						Forked from
						<a class="ml-2 text-orange-500" target="_blank" rel="noopener noreferrer" href="https://tomma5o.com/">Tomma5o</a>
					</p>
					
					<a href="https://github.com/tomma5o/domicilioBoilerplate"
						target="_blank"
						rel="noopener noreferrer"
						class="mb-5 text-xs block text-gray-500 hover:underline"
					>Se vuoi crearlo per la tua città visita la pagina GitHub del progetto</a>
				</div>
			</Fragment>
		);
	}
}
