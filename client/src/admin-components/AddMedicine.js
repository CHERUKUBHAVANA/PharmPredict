import React from 'react';
import { CDBContainer, CDBRow, CDBCol, CDBInput, CDBBtn, CDBCard } from 'cdbreact';
import Layout from '../core-components/Layout';

const ClassicForm = () => {
    const clickSubmit = (event) => {
        event.preventDefault()
        
    }
    return (
        <Layout>
        <CDBContainer>
            <h1 className="text-center mb-2">Drug Information Form</h1>

            <CDBCard className='p-3'>
                <CDBInput type="text" label="Drug Name" id="drugName" />
                <CDBRow>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <CDBCol key={index} md="auto">
                            <CDBInput type="text" label={`Substitute ${index}`} id={`substitute${index}`} />
                        </CDBCol>
                    ))}
                </CDBRow>

                <CDBRow>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <CDBCol key={index} md="auto">
                            <CDBInput type="text" label={`Side Effect ${index}`} id={`sideEffect${index}`} />
                        </CDBCol>
                    ))}
                </CDBRow>

                <CDBInput type="text" label="Chemical Class" id="chemicalClass" />

                <CDBInput type="text" label="Action Class" id="actionClass" />
                <div className="mt-4 mb-1 d-flex flex-column justify-content-center align-items-center">
                <CDBBtn outline className='mt-2' color="dark" type="submit" onClick={clickSubmit}>
                    Submit
                </CDBBtn>
                </div>
            </CDBCard>
        </CDBContainer>
        </Layout>
    );
};

export default ClassicForm;
