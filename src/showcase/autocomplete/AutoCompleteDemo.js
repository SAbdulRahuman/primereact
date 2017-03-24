import React, { Component } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from '../../components/autocomplete/AutoComplete';
import { CountryService } from '../service/CountryService';
import { TabView, TabPanel } from '../../components/tabview/TabView';
import { CodeHighlight } from '../../components/codehighlight/CodeHighlight';

export class AutoCompleteDemo extends Component {

    constructor() {
        super();
        this.state = {brand: "Ford", countries: [{"name": "Algeria", "code": "DZ"},{"name": "Turkey", "code": "TR"}], countriesData: [] };
        this.countryservice = new CountryService();
    }

    componentDidMount() {
        this.setState({ countriesData: this.countryservice.getCountries(this) });
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }

    onCountryValueChange(e) {
        this.setState({ country: e.value, filteredCountriesSingle: null });
    }

    onBrandValueChange(e) {
        this.setState({ brand: e.value, filteredBrands: null });
    }

    onCountriesValueChange(e) {
        this.setState({ countries: e.value, filteredCountriesMultiple: null });
    }

    filterCountrySingle(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesSingle: results });
    }

    filterBrands(event) {
        var results = this.brands.filter((brand) => {
            return brand.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredBrands: results });
    }

    filterCountryMultiple(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesMultiple: results });
    }

    itemTemplate(brand) {
        if (!brand) {
            return;
        }

        return (<div className="ui-helper-clearfix" style={{ borderBottom: '1px solid #D5D5D5' }}>
            <img src={`public/showcase/resources/demo/images/car/${brand}.gif`} style={{ width: '32px', display: 'inline-block', margin: '5px 0 2px 5px' }} />
            <div style={{ fontSize: '18px', float: 'right', margin: '10px 10px 0 0' }}>{brand}</div>
        </div>)
    }

    handleDropdownClick() {
        this.setState({ filteredBrands: [] });
        
        //mimic remote call
        setTimeout(() => {
            this.setState({ filteredBrands: this.brands });
        }, 100)
        
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>AutoComplete</h1>
                        <p>AutoComplete is an input component that provides real-time suggestions when being typed.</p>
                    </div>
                </div>

                <div className="content-section implementation button-demo">
                    <h3>Basic</h3>
                    <AutoComplete value={this.state.country} appendTo="body" suggestions={this.state.filteredCountriesSingle} completeMethod={this.filterCountrySingle.bind(this)} field="name"
                        size={30} placeholder="Countries" minLength={1} onChange={this.onCountryValueChange.bind(this)} />
                    <span style={{ marginLeft: '10px' }}>Country: {this.state.country ? this.state.country.name || this.state.country : 'none'}</span>

                    <h3>Advanced</h3>
                    <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands.bind(this)} size={30} minLength={1}
                        placeholder="Hint: type 'v' or 'f'" dropdown={true} onDropdownClick={this.handleDropdownClick.bind(this)} itemTemplate={this.itemTemplate.bind(this)} onChange={this.onBrandValueChange.bind(this)} />
                    <span style={{ marginLeft: '50px' }}>Brand: {this.state.brand || 'none'}</span>

                    <h3>Multiple</h3>
                    <AutoComplete value={this.state.countries} suggestions={this.state.filteredCountriesMultiple} completeMethod={this.filterCountryMultiple.bind(this)}
                        minLength={1} placeholder="Countries" field="name" multiple={true} onChange={this.onCountriesValueChange.bind(this)} />
                    <ul>
                        {this.state.countries && this.state.countries.map((c, index) => <li key={index}>{c.name}</li>)}
                    </ul>
                </div>

                <AutoCompleteDoc />
            </div>
        )
    }
}

class AutoCompleteDoc extends Component {

    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Documentation">
                        <h3>Import</h3>
                        <CodeHighlight className="language-javascript">
                            {`
import {Button} from 'primereact';

`}
                        </CodeHighlight>

                        <h3>Getting Started</h3>
                        <p>Button is created using the Button element.</p>
                        <CodeHighlight className="language-markup">
                            {`
<Button />

`}
                        </CodeHighlight>

                        <h3>Label</h3>
                        <p>Use label property to define the text of the button.</p>
                        <CodeHighlight className="language-markup">
                            {`
<Button label="Save"/>

`}
                        </CodeHighlight>

                        <h3>Icons</h3>
                        <p>Icon on a button is specified with icon attribute and position is customized using iconPos attribute. Default
                        icon position is left. To display only an icon, leave label as undefined.</p>
                        <CodeHighlight className="language-markup">
                            {`
<Button label="Click" icon="fa-check" />
<Button label="Click" icon="fa-check" iconPos="right"/>
<Button icon="fa-check" iconPos="right"/>

`}
                        </CodeHighlight>

                        <h3>Events</h3>
                        <p>Events are defined using standard notation.</p>
                        <CodeHighlight className="language-markup">
                            {`
<Button label="Click" onClick={this.handleClick} />

`}
                        </CodeHighlight>



                        <h3>Severity</h3>
                        <p>Different color options are available to define severity levels.</p>

                        <ul>
                            <li>.ui-button-secondary</li>
                            <li>.ui-button-success</li>
                            <li>.ui-button-info</li>
                            <li>.ui-button-warning</li>
                            <li>.ui-button-danger</li>
                        </ul>
                        <CodeHighlight className="language-markup">
                            {`
<Button label="Primary" />
<Button label="Secondary" className="ui-button-secondary"/>
<Button label="Success" className="ui-button-success"/>
<Button label="Info" className="ui-button-info"/>
<Button label="Warning" className="ui-button-warning"/>
<Button label="Danger" className="ui-button-danger"/>

`}
                        </CodeHighlight>

                        <h3>Attributes</h3>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>label</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Text of the button.</td>
                                    </tr>
                                    <tr>
                                        <td>icon</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Name of the icon.</td>
                                    </tr>
                                    <tr>
                                        <td>iconPos</td>
                                        <td>string</td>
                                        <td>left</td>
                                        <td>Position of the icon, valid values are "left" and "right".</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Styling</h3>
                        <p>Following is the list of structural style classes, for theming classes visit <Link to="/theming"> theming</Link> page.</p>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Element</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ui-button</td>
                                        <td>Button element</td>
                                    </tr>
                                    <tr>
                                        <td>ui-button-icon</td>
                                        <td>Icon element</td>
                                    </tr>
                                    <tr>
                                        <td>ui-button-text</td>
                                        <td>Label element of the button</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Dependencies</h3>
                        <p>None.</p>
                    </TabPanel>

                    <TabPanel header="Source">
                        <CodeHighlight className="language-javascript">
                            {`
export class ButtonDemo extends Component {
        
    constructor() {
        super();
        this.state = {count: 0};
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>Button</h1>
                        <p>Button is an extension to standard input element with icons and theming.</p>
                    </div>
                </div>

                <div className="content-section implementation button-demo">
                    <h3 className="first">Basic</h3>
                    <Button label="Click" onClick={this.increment} />
                    <Button label="Click" icon="fa-check" onClick={this.increment}/>
                    <Button label="Click" icon="fa-check" iconPos="right" onClick={this.increment}/>
                    <Button icon="fa-check" onClick={this.increment}/>
                    <Button label="Click" disabled="disabled" onClick={this.increment}/>

                    <h3>Severities</h3>
                    <Button label="Primary" onClick={this.increment} />
                    <Button label="Secondary" onClick={this.increment} className="ui-button-secondary"/>
                    <Button label="Success" onClick={this.increment} className="ui-button-success"/>
                    <Button label="Info" onClick={this.increment} className="ui-button-info"/>
                    <Button label="Warning" onClick={this.increment} className="ui-button-warning"/>
                    <Button label="Danger" onClick={this.increment} className="ui-button-danger"/>

                    <p>Number of Clicks: {this.state.count}</p>
                </div>
            </div>
        )
    }
}
`}
                        </CodeHighlight>
                    </TabPanel>
                </TabView >
            </div>
        )
    }
}