import React, { useState, useEffect } from "react";
import {
  Card,
  InnerCard,
  PollInput,
  MyButton
} from "../../../styled-components/styles";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../reducers/reducers";
import { Formik, Form, Field } from "formik";

import "./create.scss";

type TPollInput = {
  [key: string]: string;
};
const getOptions = (count: number) => {
  const options: TPollInput = {};
  for (let x = 0; x < count; x++) {
    options[`option-${x + 1}`] = "";
  }
  return options;
};
const CreatePoll = () => {
  const [options, setOptions] = useState<TPollInput>({});
  const [renderCount, setRender] = useState<number>(0);

  const socket = useSelector((state: ReduxStore) => state.socket);
  useEffect(() => {
    setOptions({ ...options, ...getOptions(3) });
  }, []);
  return (
    <Card>
      <InnerCard width="550px">
        <span className="create-header">Create a poll!</span>
        <Formik
          enableReinitialize={true}
          initialValues={{
            question: "",
            ...options
          }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ values, touched, errors }) => {
            console.log(values);
            return (
              <Form style={{ display: "flex", flexDirection: "column" }}>
                <div className="question">
                  <Field
                    label="Question"
                    required
                    name="question"
                    component={PollInput}
                  />
                </div>
                <div className="options">
                  {Object.keys(options).map(k => {
                    return (
                      <Field
                        key={k}
                        label={k}
                        name={k}
                        variant="outlined"
                        component={PollInput}
                        onChange={() => {
                          const keys = Object.keys(options);
                          if (k === keys[keys.length - 1] && renderCount <= 6) {
                            setOptions({
                              ...options,
                              [`option-${keys.length + 1}`]: ""
                            });
                            setRender(renderCount + 1);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                <MyButton type="submit" onClick={() => {}}>
                  Submit
                </MyButton>
              </Form>
            );
          }}
        </Formik>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
