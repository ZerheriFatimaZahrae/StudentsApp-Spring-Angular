package ma.enset.studentsappspringangular.repository;

import ma.enset.studentsappspringangular.entites.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,String> {
    Student findByCode(String code);
    List<Student> findByProgramId(String programId);
}
