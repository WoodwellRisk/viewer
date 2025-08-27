import { Box, Embed, IconButton } from "theme-ui";

import useStore from "../store/index";

const PDF = () => {

    const setShowReport = useStore((store) => store.setShowReport)
    // const reportURL = useStore((store) => store.reportURL)
    const reportURL = 'https://www.woodwellclimate.org/wp-content/uploads/2023/01/Woodwell-Climate-Risk-Assessment-Addis-Ababa-Ethiopia-2023.pdf#page=1'

    return (
        <>
            <Box
                as='div'
                id='pdf-container'
                sx={{
                    display: ["none", "flex"],
                    flexDirection: 'column',
                    position: "relative",
                    zIndex: 100,
                    top: ["5%"],
                    width: "auto",
                    maxWidth: "700px",
                    height: "90%",
                    mx: ["none", 2, "auto"],
                    my: "auto",
                    backgroundColor: "background",
                    borderWidth: "1px",
                    borderColor: "primary",
                    borderStyle: "solid",
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        width: '100%',
                        backgroundColor: 'background',
                    }}
                >
                    <IconButton
                        aria-label='Close PDF viewer'
                        onClick={() => {setShowReport(false)}}
                        sx={{ 
                            stroke: 'primary', 
                            cursor: 'pointer', 
                            width: 34, 
                            height: 34 
                        }}
                    >
                        X
                    </IconButton>
                </Box>
                <Embed
                    src={reportURL}
                    title='Just Access report PDF'
                    sx={{
                        height: '100%',
                    }}
                />

            </Box>
        </>
    );
};

export default PDF;
