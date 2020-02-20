import React, { useEffect, FormEvent, useReducer } from "react";
import { MyButton, MyHeader } from "../../styled-components/generic-styles";
import { Card, InnerCard } from "../../styled-components/card-styles";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/reducers";

import { CreateInput, CheckedInput } from "../../styled-components/inputs";
import { FCREATE_POLL } from "../../types/message_types";

import CreateReducer, {
  ADD_OPTION,
  QUESTION,
  OPTIONS,
  FILTERIPS
} from "./create_reducer";

import { getOptions } from "../../utils";

import "./create.scss";

const CreatePoll = () => {
  const [form, dispatchForm] = useReducer(CreateReducer, {
    question: "",
    filterIps: false,
    options: getOptions(2)
  });

  const socket = useSelector((state: ReduxStore) => state.socket);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    socket?.emit(FCREATE_POLL, form);
  };
  useEffect(() => {
    const { options } = form;
    const len = options.length;
    if (options.length <= 9 && options[len - 1].length > 1) {
      dispatchForm({ type: ADD_OPTION, payload: null });
    }
  }, [form]);

  return (
    <Card>
      <InnerCard>
        <MyHeader margin="auto">Create a poll!</MyHeader>
        <form onSubmit={handleSubmit}>
          <div className="question">
            <label className="question-label">Question</label>
            <CreateInput
              required
              name="question"
              placeholder="question goes here"
              autoComplete="off"
              value={form.question}
              onChange={e =>
                dispatchForm({ type: QUESTION, payload: e.target.value })
              }
            />
          </div>
          <div className="options">
            {form.options.map((option, i) => {
              const addFields = {
                required: i < 2 ? true : false
              };
              return (
                <div className="option" key={i}>
                  <label className="option-label">{`Option #${i + 1}`}</label>
                  <CreateInput
                    autoComplete="off"
                    {...addFields}
                    onChange={e =>
                      dispatchForm({
                        type: OPTIONS,
                        payload: { index: i, value: e.target.value }
                      })
                    }
                    value={option}
                  />
                </div>
              );
            })}
            <div className="checkbox-div">
              <CheckedInput
                onChange={() =>
                  dispatchForm({ type: FILTERIPS, payload: null })
                }
                type="checkbox"
                checked={form.filterIps}
              />
              <label>Check for duplicate Ips?</label>
            </div>
            <MyButton
              className="create-btn"
              type="submit"
              bgColor="#359BFF"
              color="#eee"
              width="115px"
            >
              Submit
            </MyButton>
          </div>
        </form>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
