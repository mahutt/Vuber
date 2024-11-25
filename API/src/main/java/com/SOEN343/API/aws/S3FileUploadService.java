package com.SOEN343.API.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
 
@Service
public class S3FileUploadService {
 
    @Autowired
    private AmazonS3 amazonS3;
 
    @Value("${aws.s3.bucketName}")
    private String bucketName;
 
    public String uploadFile(String key, MultipartFile file) throws IOException {
        Tika tika = new Tika();
        String contentType = tika.detect(file.getInputStream());

        ObjectMetadata metadata = new ObjectMetadata();

        metadata.setContentType(contentType);
        metadata.setContentLength(file.getSize());

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(putObjectRequest);

        return amazonS3.getUrl(bucketName, key).toString();
    }
}