// import React from 'react'
// import Layout from './core-components/Layout';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { CDBLink } from 'cdbreact';
// import './App.css'
// const App = () => {

// const HomePage = () => {
//   return (
//     <Container className="my-5">
//       <Row>
//         <Col>
//           <h1 className="mb-4">Welcome to Drug Supply Management System</h1>
//           <p>
//             We supply a variety of drugs to local pharmacies, utilizing advanced Machine Learning (ML) and Deep Learning (DL) models to predict the therapeutic class of drugs. Our system provides detailed analysis through Exploratory Data Analysis (EDA).
//           </p>
//         </Col>
//       </Row>

//       <Row className="my-4">
//         <Col md={4}>
//           <Card className="h-100 shadow">
//             <Card.Body>
//               <Card.Title>Drug Supply</Card.Title>
//               <Card.Text>
//                 We ensure timely and efficient supply of a diverse range of drugs to local pharmacies, maintaining a reliable inventory management system.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="h-100 shadow">
//             <Card.Body>
//               <Card.Title>Therapeutic Class Prediction</Card.Title>
//               <Card.Text>
//                 Our ML and DL models predict the therapeutic class of drugs, providing valuable insights into their usage and effects.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="h-100 shadow">
//             <Card.Body>
//               <Card.Title>Exploratory Data Analysis (EDA)</Card.Title>
//               <Card.Text>
//                 We offer detailed EDA to analyze and visualize data trends, helping you make informed decisions and optimize your drug supply chain.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="my-5">
//         <Col>
//           {/* <Button variant="dark" size="lg">
//             Get Started
//           </Button> */}
//           <CDBLink to="/pharma/signup" className="ms-auto text-white p-2 text-center" style={{display:"inline-block", border:"2px solid black", backgroundColor:"black", borderRadius:"10px"}}>Get Started</CDBLink>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

//   return (
//     <Layout>
//       <div className='text-center'>
//         {HomePage()}
//       </div>
//     </Layout>
//   )
// }
// export default App;
import React from 'react';
import Layout from './core-components/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CDBLink } from 'cdbreact';
import { isAuth } from './auth-components/helpers';
import './App.css';

const App = () => {
  const cardsData = [
    {
      title: 'Drug Supply',
      description: 'We ensure timely and efficient supply of a diverse range of drugs to local pharmacies, maintaining a reliable inventory management system.',
    },
    {
      title: 'Therapeutic Class Prediction',
      description: 'Our ML and DL models predict the therapeutic class of drugs, providing valuable insights into their usage and effects.',
    },
    {
      title: 'Exploratory Data Analysis (EDA)',
      description: 'We offer detailed EDA to analyze and visualize data trends, helping you make informed decisions and optimize your drug supply chain.',
    },
  ];

  const renderCards = () => {
    return cardsData.map((card, index) => (
      <Col md={4} key={index} className="mb-4">
        <Card className="h-100 shadow">
          <Card.Body>
            <Card.Title className="h4">{card.title}</Card.Title>
            <Card.Text className="card-description">{card.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h2 className="display-4 mb-2">Welcome to Drug Supply Management System</h2>
            <p className="lead">
              We supply a variety of drugs to local pharmacies, utilizing advanced Machine Learning (ML) and Deep Learning (DL) models to predict the therapeutic class of drugs. Our system provides detailed analysis through Exploratory Data Analysis (EDA).
            </p>
          </Col>
        </Row>

        <Row className="my-2">
          {renderCards()}
        </Row>

        <Row className=" text-center">
          <Col>
           {!isAuth() && (<CDBLink to="/pharma/signup" className="bg-dark text-white p-2" style={{ display:"inline-block", border:"2px solid black", borderRadius: "10px" }}>
              Get Started
            </CDBLink>)}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default App;
