import { LoadingButton } from "@mui/lab";
import { Grid, Typography, Button } from "@mui/material";
import { t } from "i18next";
import AppTextInput from "../../app/components/AppTextInput";
import ServiceCommentComponent from "./ServiceCommentComponent";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { findServiceId } from "../../app/utils/ServicesUtils";
import { addCommentAsync } from "./servicesSlice";
import moment from "moment";
import { toast } from "react-toastify";

interface Props {
    id: string | undefined;
}

export default function ServiceDetailsComments(props: Props) {
    const dispatch = useAppDispatch();
    const { services } = useAppSelector(state => state.services);
    const { control, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
    const { user } = useAppSelector(state => state.account);
    const [addingCommentState, setaddingCommentState] = useState(false);

    async function submitForm(data: FieldValues) {
        if (data.content.replace(/\s+/g, '') === '') {
            toast.error(t('newCommentShouldNotBeEmpty'));
        } else {
            try {
                data.Id = props.id;
                data.user = user!.username;
                data.dateTime = moment().format("YYYY-MM-DDThh:mm:ss");
                await dispatch(addCommentAsync(data));

            } catch (error) {
                console.log(error);
            } finally {
                setValue("content", "");
                setaddingCommentState(false);
            }
        }
    }

    return (
        <Grid item xs={12}>
            <Typography variant="h4">{t("comments")}</Typography>
            <Grid container >
                {findServiceId(services, props.id).comments.map(({ content, dateTime, user, id }) => (
                    <Grid item xs={12} key={id}>
                        <ServiceCommentComponent content={content} dateTime={dateTime} user={user} />
                    </Grid>
                ))}
            </Grid>
            <Grid>
                {addingCommentState ? (
                    <>
                        <Grid marginLeft="30px" marginRight="30px">
                            <AppTextInput
                                label={t("comment")}
                                variant="outlined"
                                content={""}
                                fullWidth
                                multiline
                                name={"content"}
                                control={control}
                            />
                        </Grid>
                        <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                            <LoadingButton
                                loading={isSubmitting}
                                onClick={handleSubmit(submitForm)}
                                fullWidth
                                color="success"
                                variant="outlined"
                            >{t("add")}</LoadingButton>
                        </Grid>
                    </>
                ) : (
                    <Grid display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="70px">
                        <Button variant="contained" onClick={() => setaddingCommentState(true)}>{t("addComment")}</Button>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}