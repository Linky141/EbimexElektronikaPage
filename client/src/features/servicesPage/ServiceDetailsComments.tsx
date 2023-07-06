import { LoadingButton } from "@mui/lab";
import { Grid, Typography, Button } from "@mui/material";
import { t } from "i18next";
import AppTextInput from "../../app/components/AppTextInput";
import ServiceCommentComponent from "./ServiceCommentComponent";
import { Service } from "../../app/models/service";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

interface Props {
    service: Service;
    addingCommentState: boolean;
    control: Control<FieldValues, any>;
    loadingSubmitNewComment: boolean;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    handleOnSubmitAddComment: (data: FieldValues) => void;
    setaddingCommentState: Dispatch<SetStateAction<boolean>>;
}

export default function ServiceDetailsComments(props: Props) {
    return (
        <Grid item xs={12}>
            <Typography variant="h4">{t("comments")}</Typography>
            <Grid container >
                {props.service.comments.map(({ content, dateTime, user, id }) => (
                    <Grid item xs={12} key={id}>
                        <ServiceCommentComponent content={content} dateTime={dateTime} user={user} />
                    </Grid>
                ))}
            </Grid>
            <Grid>
                {props.addingCommentState ? (
                    <>
                        <Grid marginLeft="30px" marginRight="30px">
                            <AppTextInput
                                label={t("comment")}
                                variant="outlined"
                                content={""}
                                fullWidth
                                multiline
                                name={"content"}
                                control={props.control}
                            />
                        </Grid>
                        <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                            <LoadingButton
                                loading={props.loadingSubmitNewComment}
                                onClick={props.handleSubmit(props.handleOnSubmitAddComment)}
                                fullWidth
                                color="success"
                                variant="outlined"
                            >{t("add")}</LoadingButton>
                        </Grid>
                    </>
                ) : (
                    <Grid display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="70px">
                        <Button variant="contained" onClick={() => props.setaddingCommentState(true)}>{t("addComment")}</Button>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}