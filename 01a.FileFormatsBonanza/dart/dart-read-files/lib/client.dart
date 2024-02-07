// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:yaml/yaml.dart';

class Client {
  final int? id;
  final String? firstname;
  final String? lastname;
  final String? phoneNumber;
  final String? email;
  final String? companyName;

  Client({
    this.id,
    this.firstname,
    this.lastname,
    this.phoneNumber,
    this.email,
    this.companyName,
  });

  factory Client.fromYaml(YamlMap map){
  final id = map['id'] as int;
  final firstname = map['firstname'] as String;
  final lastname = map['lastname'] as String;
  final companyName = map['companyName'] as String;
  final phoneNumber = map['phoneNumber'] as String;
  final email = map['email'] as String;
  return Client(id: id, firstname: firstname,lastname: lastname, companyName: companyName, email: email, phoneNumber: phoneNumber);
}


  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'firstname': firstname,
      'lastname': lastname,
      'phoneNumber': phoneNumber,
      'email': email,
      'companyName': companyName,
    };
  }

  factory Client.fromMap(Map<String, dynamic> map) {
    return Client(
      id: map['id'] != null ? map['id'] as int : null,
      firstname: map['firstname'] != null ? map['firstname'] as String : null,
      lastname: map['lastname'] != null ? map['lastname'] as String : null,
      phoneNumber: map['phoneNumber'] != null ? map['phoneNumber'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      companyName: map['companyName'] != null ? map['companyName'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory Client.fromJson(String source) => Client.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'Client(id: $id, firstname: $firstname, lastname: $lastname, phoneNumber: $phoneNumber, email: $email, companyName: $companyName)';
  }
}

