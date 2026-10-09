import { useFormStore } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';

export default function Categories() {
  const { formData, updateFormData } = useFormStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Submitted Data:', formData);
    // Send `formData` to your backend API here
  };

  return (
        <Container className="py-5">
      <h1>Categories</h1>
      <p>Learn more about our cetegories here...</p>
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="button" onClick={() => navigate('/')}>Back</button>
      <button type="submit">Submit All</button>
    </form>
    </Container>
  );
}
