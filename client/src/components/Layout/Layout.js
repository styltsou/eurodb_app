import React, { Children, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

import theme from "../../utils/theme";
import GlobalStyles from "../../utils/global";

const FlexContainer = styled.div``;

const Wrapper = styled.div``;

const Main = styled.main``;

const Layout = ({ children }) => {
	return (
		<ThemeProvider>
			<FlexContainer>
				<Wrapper>
					<Main>{children}</Main>
				</Wrapper>
				<GlobalStyles />
			</FlexContainer>
		</ThemeProvider>
	);
};

export default Layout;
