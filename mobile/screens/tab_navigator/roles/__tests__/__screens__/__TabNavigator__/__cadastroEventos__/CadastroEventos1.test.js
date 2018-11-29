import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import renderer from "react-test-renderer";
import CadastroEventos1 from "../../../../screens/TabNavigator/cadastroEventos/CadastroEventos1";

Enzyme.configure({ adapter: new Adapter() });

it("renders correctly", () => {
	const navigation = {
		state: {
			params: {
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
			}
		},
		navigate: jest.fn()
	};

	const tree = renderer
		.create(<CadastroEventos1 navigation={navigation} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
