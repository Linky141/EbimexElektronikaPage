import { Grid } from "@mui/material";
import { useState } from "react";
import InfoOpenedHoursShow from "./InfoOpenedHoursShow";
import InfoOpenedHoursEdit from "./InfoOpenedHoursEdit";

export default function InfoOpenedHours() {
    const [editingOpenedHoursMode, setEditingOpenedHoursMode] = useState(false);

    return (
        <>
            <Grid item xs={12}>
                {!editingOpenedHoursMode ? (
                    <InfoOpenedHoursShow
                        setEditingOpenedHoursMode={setEditingOpenedHoursMode}
                    />
                ) : (
                    <InfoOpenedHoursEdit
                        setEditingOpenedHoursMode={setEditingOpenedHoursMode}
                    />
                )}
            </Grid>
        </>
    )
}