package eg_4;


import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@WebServlet("/displayFormLink")
public class DisplayFormLinkServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // This would be dynamically generated or retrieved from the database
    private static final String GOOGLE_FORM_URL = "https://docs.google.com/forms/d/your-google-form-id/viewform";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type
        response.setContentType("text/html");

        try (PrintWriter out = response.getWriter()) {
            out.println("<html><body>");
            out.println("<h2>Application Form</h2>");
            out.println("<p>Click the link below to fill out your details for the company application:</p>");
            out.println("<a href='" + GOOGLE_FORM_URL + "' target='_blank'>Fill out Application Form</a>");
            out.println("</body></html>");
        }
    }
}
