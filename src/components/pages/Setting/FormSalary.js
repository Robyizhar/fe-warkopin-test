import React, {Fragment} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { detailData } from '../../../api/SettingAPI';
import { rules } from './Validation';
import Toast from '../../atom/Toast';


const FormSalary = () => {

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.departements );
	// let redirect = useNavigate();
    let params = useParams();

    let user = useSelector( state => state.auth );
    let token = user.token || '';

    React.useEffect(() => {

        let result = detailData('salary', token);
        result.then(function (data) {
            let row = data.data.data;
            let value = JSON.parse(row.value)
            console.log(value);

            setValue("name", row.name);
            setValue("salary", value.salary);
            setValue("l1", value.l1);
            setValue("l2", value.l2);
            setValue("l3", value.l3);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, 'salary']);

    const submitHandler = data => {

        // dispatch(setStatus('process'));
        
        // let result
        let formData = data;
        console.log(formData);
        // dispatch(setInput(formData));
        // result = dispatch(updateData());

        // result.then(function(row) {
        //     if (row.error) {
        //         const fields = row.error.response.data.message;
        //         Object.keys(fields).forEach((field) => {
        //             setError(field, {message: fields[field]});
        //         });
        //     } else {
        //         dispatch(setStatus('success', row.result.data.message));
        //         dispatch(setInput(''));
        //         redirect(`/departement`);
        //     }
        // });
    }

    return (
        <Fragment>
            <div className='row'>
                <div className='col-md-6 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">UMK / Bln</label>
                                    <input type="number" className="form-control" {...register('salary', rules.salary)} />
                                    <input type="hidden" className="form-control" {...register('name', rules.name)} />
                                    {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">L1</label>
                                    <input type="text" className="form-control" {...register('l1', rules.l1)} />
                                    {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">L2</label>
                                    <input type="text" className="form-control" {...register('l2', rules.l2)} />
                                    {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">L3</label>
                                    <input type="text" className="form-control" {...register('l3', rules.l3)} />
                                    {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                                </div>
                                {   
                                    response.status === 'process' ?
                                    <button type="submit" disabled className="btn btn-primary">Loading...</button> : 
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default FormSalary