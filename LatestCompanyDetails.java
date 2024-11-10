package eg_13;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

@WebServlet("/LatestCompanyDetails")  // Registering servlet without web.xml
public class LatestCompanyDetails extends HttpServlet {

    // Database connection parameters
	private static final String DB_URL = "jdbc:mysql://localhost:3306/p?useSSL=false&serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "5Nov@2024";

    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Register the JDBC driver for MySQL
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        // Set response type to text/html
        response.setContentType("text/html");

        // Initialize database connection variables
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        // Start building the HTML response
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head><title>Latest Companies</title></head>");
        out.println("<body>");
        out.println("<h1>Latest Companies</h1>");
        out.println("<table border='1'>");
        out.println("<tr><th>Name</th><th>Stipend</th><th>Location</th><th>CGPA Criteria</th></tr>");

        try {
            // Establish the database connection
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            stmt = conn.createStatement();
            // Query to fetch the companies' data from the database
            rs = stmt.executeQuery("SELECT * FROM companies");

            // Loop through the result set and generate HTML rows for each company
            while (rs.next()) {
                String name = rs.getString("name");
                String stipend = rs.getString("stipend");
                String location = rs.getString("location");
                String cgpa_criteria = rs.getString("cgpa_criteria");

                // Display the company details in a table row
                out.println("<tr>");
                out.println("<td>" + name + "</td>");
                out.println("<td>" + stipend + "</td>");
                out.println("<td>" + location + "</td>");
                out.println("<td>" + cgpa_criteria + "</td>");
                out.println("</tr>");
            }

        } catch (SQLException e) {
            // Handle database errors
            out.println("<tr><td colspan='4'>Error fetching company data: " + e.getMessage() + "</td></tr>");
        } finally {
            // Clean up database resources
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // End the HTML table and page
        out.println("</table>");
        out.println("</body>");
        out.println("</html>");
    }
}
  