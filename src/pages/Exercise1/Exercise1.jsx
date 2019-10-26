import React, { Component } from 'react'
import axios from 'axios'
import DescriptionExercise from '../DescriptionExercise'
import { ReactComponent as PokeballIcon } from '../../assets/icons/pokeball.svg'
import classes from './Exercise1.module.scss'
import Card from './Card/Card'

const instructions = [
	'Identifique e corrija todos os pontos que estão impactando(ou podem impactar no futuro) a performance da página.',
	'Corrija os pontos do código que vão contra as convenções do React.',
	'Sempre que um item é mudado de lista, ele deve aparecer na primeira posição da outra lista.',
	'Não mude a estrutura da página (tabelas, cards, etc...) e nem dos componentes (Stateless -> Stateful / Stateful -> Stateless)',
	'Não use Hooks.',
	'A solução final não deve apresentar nenhum erro ou warning no console do browser.'
]

const getPokemonNumber = pokemonNumber => {
	if (pokemonNumber < 10) return `00${pokemonNumber}`
	if (pokemonNumber < 100) return `0${pokemonNumber}`
	return pokemonNumber
}

class Exercise1 extends Component {
	state = {
		availableElements: [],
		selectedElements: []
	}

	componentWillMount() {
		this.getListPokemon()
	}

	getListPokemon() {
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`).then(res => {
			const availableElements = res.data.results.map((item, ix) => {
				return {
					number: getPokemonNumber(ix + 1),
					...item
				}
			})
			this.setState({ availableElements })
		})
	}

	handleSelectedElements(index) {
		const { availableElements, selectedElements } = this.state

		this.setState({
			selectedElements: availableElements
				.splice(index, 1)
				.concat(selectedElements)
		})
	}

	handleAvailableElements(index) {
		const { availableElements, selectedElements } = this.state

		this.setState({
			availableElements: selectedElements
				.splice(index, 1)
				.concat(availableElements)
		})
	}

	getPokemonIconURL = pokemonNumber => {
		return `https://www.serebii.net/pokedex-sm/icon/${pokemonNumber}.png`
	}

	render() {
		const { availableElements, selectedElements } = this.state
		return (
			<div className={classes.Exercise1}>
				<DescriptionExercise instructions={instructions} />
				<div className={classes.Exercise1Container}>
					<div className={classes.AvailableContainer}>
						<table className={classes.Table}>
							<tbody>
								{availableElements.map((element, index) => (
									<tr key={Math.random()}>
										<td className={classes.Number}>
											<div>{`#${element.number}`}</div>
										</td>
										<td className={classes.Description}>
											<div
												className={
													classes.PokemonContainer
												}
											>
												<img
													src={this.getPokemonIconURL(
														element.number
													)}
													alt='Pokemon Icon'
												/>
												<span>{element.name}</span>
											</div>
										</td>
										<td className={classes.Action}>
											<PokeballIcon
												onClick={() =>
													this.handleSelectedElements(
														index
													)
												}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className={classes.CaptureContainer}>
						{selectedElements.map((element, index) => (
							<Card
								key={Math.random()}
								number={`#${element.number}`}
								name={element.name}
								src={this.getPokemonIconURL(element.number)}
								onClick={() =>
									this.handleAvailableElements(index)
								}
							/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Exercise1
