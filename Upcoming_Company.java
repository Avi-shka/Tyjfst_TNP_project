package eg_4;


import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

@WebServlet("/Upcoming_Company")
public class Upcoming_Company extends HttpServlet {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/p?useSSL=false&serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "5Nov@2024";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");  // Change the content type to HTML

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        PrintWriter out = response.getWriter();
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        // Get query parameter to determine the type of companies to fetch
        String type = request.getParameter("type");

        String query;
        try {
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            stmt = conn.createStatement();

            // Define SQL query based on the type of companies requested
            if ("upcoming".equals(type)) {
                // Fetch only upcoming companies with event dates in the future
                query = "SELECT name, stipend, location, cgpa_criteria FROM company_details WHERE event_date > CURDATE() ORDER BY event_date ASC";
            } else {
                // Fetch all companies
                query = "SELECT name, stipend, location, cgpa_criteria FROM company_details ORDER BY event_date ASC";
            }

            rs = stmt.executeQuery(query);

            // Start the HTML response
            out.println("<html>");
            out.println("<head><title>Latest Companies</title></head>");
            out.println("<body>");
            out.println("<h1>Company Details</h1>");
            out.println("<table border='1'>");
            out.println("<tr><th>Name</th><th>Stipend</th><th>Location</th><th>CGPA Criteria</th></tr>");

            // Loop through the result set and display data in the table
            while (rs.next()) {
                String name = rs.getString("name");
                String stipend = rs.getString("stipend");
                String location = rs.getString("location");
                String cgpaCriteria = rs.getString("cgpa_criteria");

                out.println("<tr>");
                out.println("<td>" + name + "</td>");
                out.println("<td>" + stipend + "</td>");
                out.println("<td>" + location + "</td>");
                out.println("<td>" + cgpaCriteria + "</td>");
                out.println("</tr>");
            }

            // Close the table and HTML tags
            out.println("</table>");
            out.println("</body>");
            out.println("</html>");

        } catch (SQLException e) {
            e.printStackTrace();
            out.println("<p>Error fetching company data: " + e.getMessage() + "</p>");
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}


