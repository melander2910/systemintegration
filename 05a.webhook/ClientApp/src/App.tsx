import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/PageNotFound";
import Layout from "./routes/Layout";
import { BasePage } from "./pages/BasePage";
import TimeTracking from "./pages/Timetracking";
import { WebhookRegistration } from "./pages/WebhookRegistration";
import Login from "./pages/Login";
import Register from "./pages/Register";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path='/:id' element={<BasePage />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/clients" element={<Contact />} />
          <Route path="/timetracking" element={<TimeTracking />} />
          <Route path="/webhookregistration" element={<WebhookRegistration />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;