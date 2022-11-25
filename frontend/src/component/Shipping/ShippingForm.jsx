import React, { useState, useEffect } from 'react'
import "./ShippingInfo.css";
import Loader from '../layout/Loader.jsx/Loader';
import { ReactNotifications } from 'react-notifications-component';
import Notification from '../Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { OrderItems } from '../../actions/orderActions';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../actions/CartActions';

const ShippingForm = () => {

    const [state, setStateName] = useState("")
    const [country, setCountry] = useState("")
    const [pinCode, setPincode] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setcity] = useState("")
    const [Address, setAddress] = useState("")
    const [itemsPrice, setItemsPrice] = useState(0)
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector(state => state.order);
    const orderItems = useSelector(state => state.cart.cartItems);
    //Useeffect
    useEffect(() => {
        let subTotal = 0.00;
        orderItems.map((i) => {
            subTotal += (i.price * i.quantity);
        })
        setItemsPrice(subTotal);

        if (order.order) {
            dispatch(clearCart());
        } else if (error) {
            Notification("Error", error, "danger");
        }
    }, [loading, error, order])

    // Order Function
    const SubmitInfo = (e) => {
        e.preventDefault();

        const shippingInfo = {
            adress: Address,
            city: city,
            state: state,
            country: country,
            pinCode: pinCode,
            phoneNo: phone
        }

        const paymentInfo = {
            id: "121",
            status: "asd",
        }


        const taxPrice = itemsPrice * 5 / 100;
        const shippingPrice = 100;
        const totalPrice = taxPrice + shippingPrice + itemsPrice;
        if (!city || !Address || !state || !country || !phone || !pinCode) {
            Notification("Error", "Enter Complete Details", "danger")
        } else {
            dispatch(OrderItems(shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice));
        }
    }
    return (
        <div>
            <center>
                <ReactNotifications />
                {loading ? <Loader /> :
                    <div className='formwidth'>
                        <ReactNotifications />
                        <form className="row g-3">
                            <h1 className="homeheading">Shipping Info</h1>
                            <center>
                                <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} className="mb-5" />
                            </center>
                            <div className="form-floating">
                                <select className='form-control' placeholder='Country' value={state} onChange={(e) => { setStateName(e.target.value) }} >
                                    <option value="  " >Select a State / Continent</option>
                                    <option value="Asia">Asia</option>
                                    <option value="North America">North America</option>
                                    <option value="South America">South America</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Australia">Australia</option>
                                </select>
                                <label>State / Continent</label>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' placeholder='Country' value={country} onChange={(e) => { setCountry(e.target.value) }} >
                                    <option value="  " >Select a country</option>
                                    <optgroup label="North America">
                                        <option value="US">United States</option>
                                        <option value="UM">United States Minor Outlying Islands</option>
                                        <option value="CA">Canada</option>
                                        <option value="MX">Mexico</option>
                                        <option value="AI">Anguilla</option>
                                        <option value="AG">Antigua and Barbuda</option>
                                        <option value="AW">Aruba</option>
                                        <option value="BS">Bahamas</option>
                                        <option value="BB">Barbados</option>
                                        <option value="BZ">Belize</option>
                                        <option value="BM">Bermuda</option>
                                        <option value="VG">British Virgin Islands</option>
                                        <option value="KY">Cayman Islands</option>
                                        <option value="CR">Costa Rica</option>
                                        <option value="CU">Cuba</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Dominican Republic</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GP">Guadeloupe</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HN">Honduras</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="AN">Netherlands Antilles</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="PA">Panama</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="KN">Saint Kitts and Nevis</option>
                                        <option value="LC">Saint Lucia</option>
                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                        <option value="TT">Trinidad and Tobago</option>
                                        <option value="TC">Turks and Caicos Islands</option>
                                        <option value="VI">US Virgin Islands</option>
                                    </optgroup>
                                    <optgroup label="South America">
                                        <option value="Argentina">Argentina</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="Chile">Chile</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Falkland Island (Malvinas)">Falkland Islands (Malvinas)</option>
                                        <option value="French Guiana">French Guiana</option>
                                        <option value="Guyana">Guyana</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Peru">Peru</option>
                                        <option value="Suriname">Suriname</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Venezuela">Venezuela</option>
                                    </optgroup>
                                    <optgroup label="Europe">
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Andorra">Andorra</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Croatia (Hrvatska)">Croatia (Hrvatska)</option>
                                        <option value="Cyprus">Cyprus</option>
                                        <option value="Czech">Czech Republic</option>
                                        <option value="France">France</option>
                                        <option value="Gibraltar">Gibraltar</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                        <option value="Hungary">Hungary</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Liechtenstein">Liechtenstein</option>
                                        <option value="Luxembourg">Luxembourg</option>
                                        <option value="Macedonia">Macedonia</option>
                                        <option value="Malta">Malta</option>
                                        <option value="Moldova">Moldova</option>
                                        <option value="Monaco">Monaco</option>
                                        <option value="Montenegro">Montenegro</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Romania">Romania</option>
                                        <option value="San Marino">San Marino</option>
                                        <option value="Serbia">Serbia</option>
                                        <option value="Slovakia">Slovakia</option>
                                        <option value="Slovenia">Slovenia</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="Denmark">Denmark</option>
                                        <option value="Estonia">Estonia</option>
                                        <option value="Faroe Islands">Faroe Islands</option>
                                        <option value="Finland">Finland</option>
                                        <option value="Greenland">Greenland</option>
                                        <option value="Iceland">Iceland</option>
                                        <option value="Ireland">Ireland</option>
                                        <option value="Latvia">Latvia</option>
                                        <option value="Lithuania">Lithuania</option>
                                        <option value="Norway">Norway</option>
                                        <option value="Svalbard and Jan Mayen Islands">Svalbard and Jan Mayen Islands</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Switzerland">Switzerland</option>
                                        <option value="Turkey">Turkey</option>
                                    </optgroup>
                                    <optgroup label="Asia">
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="China">China</option>
                                        <option value="Christmas Island">Christmas Island</option>
                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Iran">Iran</option>
                                        <option value="Iraq">Iraq</option>
                                        <option value="Israel">Israel</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Korea, Democratic People's Republic of Korea">Korea, Democratic People's Republic of Korea</option>
                                        <option value="Korea, Republic of Korea">Korea, Republic of Korea</option>
                                        <option value="Kuwait">Kuwait</option>
                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                        <option value="Lao">Lao</option>
                                        <option value="Lebanon">Lebanon</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Mongolia">Mongolia</option>
                                        <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Oman">Oman</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Qatar">Qatar</option>
                                        <option value="Russian Federation">Russian Federation</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Syria">Syria</option>
                                        <option value="Taiwan">Taiwan</option>
                                        <option value="Tajikistan">Tajikistan</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="East Timor">East Timor</option>
                                        <option value="Turkmenistan">Turkmenistan</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Vietnam">Vietnam</option>
                                        <option value="Yemen">Yemen</option>
                                    </optgroup>
                                    <optgroup label="Australia / Oceania">
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Cook Islands">Cook Islands</option>
                                        <option value="Fiji">Fiji</option>
                                        <option value="French Polynesia (Tahiti)">French Polynesia (Tahiti)</option>
                                        <option value="Guam">Guam</option>
                                        <option value="Kiribati">Kiribati</option>
                                        <option value="Marshall Islands">Marshall Islands</option>
                                        <option value="Micronesia , Federated States">Micronesia, Federated States of</option>
                                        <option value="Nauru">Nauru</option>
                                        <option value="New Caledonia">New Caledonia</option>
                                        <option value="New Zealand">New Zealand</option>
                                        <option value="Niue">Niue</option>
                                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                        <option value="Palau">Palau</option>
                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                        <option value="Pitcairn">Pitcairn</option>
                                        <option value="Samoa">Samoa</option>
                                        <option value="Solomon Islands">Solomon Islands</option>
                                        <option value="Tokelau">Tokelau</option>
                                        <option value="Tonga">Tonga</option>
                                        <option value="Tuvalu">Tuvalu</option>
                                        <option value="Vanuatu">Vanuatu</option>
                                        <option valud="Wallis and Futuna Islands">Wallis and Futuna Islands</option>
                                    </optgroup>
                                    <optgroup label="Africa">
                                        <option value="Algeria">Algeria</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Burkina">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Cape Verde">Cape Verde</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo">Congo</option>
                                        <option value="Congo, the Democratic Republic ">Congo, the Democratic Republic </option>
                                        <option value="Dijibouti">Dijibouti</option>
                                        <option value="Egypt">Egypt</option>
                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                        <option value="Eritrea">Eritrea</option>
                                        <option value="Ethiopia">Ethiopia</option>
                                        <option value="Gabon">Gabon</option>
                                        <option value="Gambia">Gambia</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Guinea">Guinea</option>
                                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                                        <option value="Cote d'Ivoire (Ivory Coast)">Cote d'Ivoire (Ivory Coast)</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Lesotho">Lesotho</option>
                                        <option value="Liberia">Liberia</option>
                                        <option value="Libya">Libya</option>
                                        <option value="Madagascar">Madagascar</option>
                                        <option value="Malawi">Malawi</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Mauritania">Mauritania</option>
                                        <option value="Mauritius">Mauritius</option>
                                        <option value="Mayotte">Mayotte</option>
                                        <option value="Morocco">Morocco</option>
                                        <option value="Mozambique">Mozambique</option>
                                        <option value="Namibia">Namibia</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Reunion">Reunion</option>
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                        <option value="Saint Helena">Saint Helena</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Seychelles">Seychelles</option>
                                        <option value="Sierra Leone">Sierra Leone</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="South Sudan">South Sudan</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Swaziland">Swaziland</option>
                                        <option value="Tanzania">Tanzania</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Western Sahara">Western Sahara</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                    </optgroup>
                                    <option value="ANTARCTICA">Antarctica</option></select>
                                <label>Country</label>
                            </div>
                            <div className="form-floating">
                                <input type="city" className="form-control" placeholder="City" value={city} onChange={(e) => { setcity(e.target.value) }} />
                                <label>City</label>
                            </div>
                            <div className="form-floating">
                                <input type="Number" className="form-control" placeholder="Pincode" value={pinCode} onChange={(e) => { setPincode(e.target.value) }} />
                                <label>Pincode</label>
                            </div>
                            <div className="form-floating">
                                <input type="Address" className="form-control" placeholder="Address" value={Address} onChange={(e) => { setAddress(e.target.value) }} />
                                <label>Address</label>
                            </div>
                            <div className="form-floating">
                                <input type="number" className="form-control" placeholder="Address" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                <label>Phone No.</label>
                            </div>
                            <button className="btn btn-info mt-5" onClick={SubmitInfo}>Submit</button>
                        </form>
                    </div>
                }
            </center>
        </div>
    )
}

export default ShippingForm
