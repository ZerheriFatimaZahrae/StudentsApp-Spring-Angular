package ma.enset.studentsappspringangular.repository;

import ma.enset.studentsappspringangular.entites.Payment;
import ma.enset.studentsappspringangular.entites.PaymmentStatus;
import ma.enset.studentsappspringangular.entites.PaymmentType;
import ma.enset.studentsappspringangular.entites.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    List<Payment> findByStudentCode(String studentCode);
    List<Payment> findByStatus(PaymmentStatus status);
    List<Payment> findByType(PaymmentType type);
}
