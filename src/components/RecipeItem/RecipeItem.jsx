import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

//EXTRA MUI AT THE END 
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";

function RecipeItem({recipe}){
    const dispatch = useDispatch();
    const history = useHistory();

    const toDetails = () => {
        //dispatching recipe as object to Selected Reducer
        dispatch({type: "STORE_DETAILS", payload: recipe})
        //navigate to details page
        // history.push("/details")
    }


    return(
        <div
        onClick={toDetails}
        >
            <img
            height="300"
            src={recipe.image}
            alt={recipe.name}
            />

        </div>
    )
}

export default RecipeItem;